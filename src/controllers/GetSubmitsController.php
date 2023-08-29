<?php

namespace tbi\systemleads\controllers;

use craft\web\Controller;
use craft\helpers\UrlHelper;
use Exception;
use yii\web\Response;
use Solspace\Freeform\Elements\Submission;
use Solspace\Freeform\Elements\Submission as FreeformSubmission;


class GetSubmitsController extends Controller
{
    public function actionGetSubmission(): Response
    {
        try {
            $request = \Craft::$app->getRequest();
            $formHandle = $request->getBodyParam('formHandle') ?? null;
            $formData = $request->getBodyParam('formData') ?? null;
            $filterDate = $request->getBodyParam('filterDate') ?? null;

            if (empty($formHandle) || empty($formData)) {
                return $this->asJson([
                    "message" => "The data provided is incomplete",
                    "code" => 403
                ]);
            }

            $query = null;
            if (!empty($filterDate)) {
                $type = $filterDate["type"];
                if ($type == "range") {
                    $valueDate = explode('|', $filterDate["date"]);
                    $startDate = new \DateTime($valueDate[0] ?? null);
                    $endDate = new \DateTime($valueDate[1] ?? null);
                    $start = ">= " . $startDate->format('Y-m-d');
                    $end = "< " . $endDate->modify('+1 day')->format('Y-m-d');
                } else {
                    $date = new \DateTime($filterDate["date"] ?? null);
                    $start = ">= " . $date->format('Y-m-d');
                    $end = "< " . $date->modify('+1 ' . ($type == "month" ? "month" : "day"))->format('Y-m-d');
                }
                $query = Submission::find()
                    ->form($formHandle)
                    ->dateCreated(['and', $start, $end])
                    ->all();
            } else {
                $query = Submission::find()
                    ->form($formHandle)
                    ->all();
            }

            if (empty($query)) {
                return $this->asJson([
                    "code" => 200,
                    "data" => [],
                ]);
            }
            $Response =  getData($query, $formData);
            return $this->asJson([
                "code" => 200,
                "data" => $Response,
            ]);
        } catch (Exception $e) {
            return $this->asJson([
                "error" => "An unexpected error has occurred at the time of collecting the form information, it is possible that the form does not contain information.",
                "More info" => $e,
                "code" => 403,
            ]);
        }
    }
}


function getData($query, $formData)
{
    $Submissions = [];
    foreach ($query as $submission) {
        $fieldsSubmissions = [];
        foreach ($submission as $field) {
            $value = $submission[$field->getHandle()]->getValue();
            if (is_array($value)) {
                $getValue = reset($value);
                $value = !$getValue ? "" : $getValue;
            }
            $fieldsSubmissions[$field->getHandle()] = ["label" => $field->getLabel(), "value" => $value];
        }
        $Submissions["item-" . $submission->getId()] = [
            "title"  => $submission->title,
            "url" => UrlHelper::url('') . "admin/freeform/submissions/" . $submission->getId(),
            "fields" => $fieldsSubmissions,
            "dateCreate" => $submission->dateCreated

        ];
    }

    $Response =  fieldsValidations($Submissions, $formData);

    return $Response;
}


function fieldsValidations($data, $conditionArray)
{
    $arrayElements = [];
    foreach ($conditionArray as $condicion) {
        $field = $condicion['field']['handle'];
        $operator = $condicion['operator'];
        $value = $condicion['value'];
        $points = (int)$condicion['points'];

        foreach ($data as $key => $itemData) {
            $fields = $itemData["fields"];
            if (array_key_exists($field, $fields)) {
                $item = $fields[$field];
                $itemValue = $item["value"];
                $isLead = false;
                switch ($operator) {
                    case "contiene":
                        $isLead = stripos($itemValue, $value) !== false;
                        break;
                    case "contiene-mm":
                        $isLead = strpos($itemValue, $value) !== false;
                        break;
                    case 'no-contiene':
                        $isLead = stripos($itemValue, $value) === false;
                        break;
                    case 'no-contiene-mm':
                        $isLead = strpos($itemValue, $value) === false;
                        break;
                    case 'mayor-que':
                        $isLead = $value > $itemValue;
                        break;
                    case 'menor-que':
                        $isLead = $value < $itemValue;
                        break;
                    case 'es-igual-a':
                        $isLead = $value === $itemValue;
                        break;
                    case 'no-es-igual-a':
                        $isLead = $value !== $itemValue;
                        break;
                    case 'coincide':
                        $isLead = preg_match('/' . $value . '/', $itemValue) === 1;
                        break;
                    case 'no-coincide':
                        $isLead = preg_match('/' . $value . '/', $itemValue) !== 1;
                        break;
                    default:
                        $isLead = false;
                        break;
                }

                if ($isLead) {
                    $newDataCreate = [
                        "handle" => $field,
                        "label" => $item["label"],
                        "operator" => $operator,
                        "value" => $value,
                        "valueSubmission" => $itemValue,
                        "points" =>  $points,
                        "isLead" => $isLead,
                    ];

                    if (array_key_exists($key, $arrayElements)) {
                        $element = $arrayElements[$key];
                        $fields = $element["fields"];
                        array_push($fields, $newDataCreate);
                        $arrayElements[$key]["fields"] = $fields;
                        $arrayElements[$key]["totalPoints"] += (int)$points;
                    } else {
                        $arrayElements[$key] = [
                            "title" => $itemData["title"],
                            "url" => $itemData["url"],
                            "totalPoints" => $points,
                            "fields" => [$newDataCreate],
                            "date" => $itemData["dateCreate"]->format('Y-m-d')
                        ];
                    }
                }
            }
        }
    }

    return $arrayElements;
}
