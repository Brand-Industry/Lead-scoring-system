<?php

namespace brandindustry\leadscoringsystem\controllers;

use craft\web\Controller;
use Exception;
use yii\web\Response;
use Solspace\Freeform\Elements\Submission;

use brandindustry\leadscoringsystem\services\SubmissionService;


class GetSubmitsController extends Controller
{
    private $submissionService;

    public function __construct(string $id, $module, SubmissionService $submissionService, array $config = [])
    {
        parent::__construct($id, $module, $config);
        $this->submissionService = $submissionService;
    }

    public function actionSubmission(): Response
    {
        try {
            $request = \Craft::$app->getRequest();
            $formHandle = $request->getBodyParam('formHandle') ?? null;
            $formData = $request->getBodyParam('formData') ?? null;
            $filterDate = $request->getBodyParam('filterDate') ?? null;
            $page = $request->getBodyParam('page', 1) ?? null;
            $perPage = $request->getBodyParam('perPage', 10) ?? null;
            $allResults = $request->getBodyParam('resultsAll', false) ?? null;
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

            $responseData = $this->submissionService->getData($query);
            if (empty($responseData)) {
                return $this->asJson([
                    "code" => 200,
                    "data" => [],
                ]);
            }

            $FieldsValidations = $this->submissionService->fieldsValidations($responseData, $formData);
            // $totalResults = count($FieldsValidations);
            // $startIndex = ($page - 1) * $perPage;
            // $endIndex = $startIndex + $perPage;

            // $paginatedResults = array_slice($FieldsValidations, $startIndex, $perPage);
            // $totalPages = ceil($totalResults / $perPage);

            // return $this->asJson([
            //     "code" => 200,
            //     "data" => [
            //         "items" => $paginatedResults,
            //         "allItems" => $allResults ? $FieldsValidations : [],

            //     ],
            //     "pagination" => [
            //         "total" => $totalResults,
            //         "totalPages" => $totalPages,
            //         "page" => $page

            //     ]
            // ]);
            return $this->asJson([
                "code" => 200,
                "data" => $FieldsValidations,
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
