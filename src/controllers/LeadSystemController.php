<?php

namespace brandindustry\leadscoringsystem\controllers;

use brandindustry\leadscoringsystem\records\LeadScoringSystemRecord;
use craft\web\Controller;
use yii\web\Response;
use craft\helpers\UrlHelper;
use yii\db\Query;
use Solspace\Freeform\Freeform;

class LeadSystemController extends Controller
{
    public function actionDefaultView(): Response
    {
        return $this->redirect(UrlHelper::cpUrl("lead-scoring-system/forms"));
        // return $this->renderTemplate('lead-scoring-system/lead-system/index');
    }
    public function actionForms(): Response
    {
        return $this->renderTemplate('lead-scoring-system/lead-system/_forms', ["pageTitle" => "Formularios"]);
    }

    public function actionForm(string $handle): Response
    {
        $form = Freeform::getInstance()->forms->getFormByHandle($handle) ?? null;
        if (empty($form)) {
            return $this->renderTemplate("lead-scoring-system/lead-system/_form.twig", [
                'notFoundForm' => true,
            ]);
        }

        $fields = $form->getLayout()->getFields();
        $dataFields = [];
        foreach ($fields as $field) {
            $typeField = $field->getType();
            if ($typeField !== "submit") {
                $dataFields[] = [
                    "handle" => $field->getHandle(),
                    "type" => $typeField,
                    "label" => $field->getLabel(),
                ];
            }
        }
        return $this->renderTemplate("lead-scoring-system/lead-system/_form.twig", [
            "formData" => $dataFields,
            "formHandle" => $handle,
            "formName" => $form->name,
            "pageTitle" => "Formulario: " . $form->name
        ]);
    }

    public function actionGetLeads(string $uid): Response
    {
        $template = 'lead-scoring-system/lead-system/_resultsLeads';
        $record = new Query();
        $record->select([
            'formName',
            'formHandle',
            'formData',
            'filterDate',
        ])->from(LeadScoringSystemRecord::tableName());

        $query = $record->where(['uid' => $uid])->one();

        if (!$query) {
            return $this->renderTemplate($template, [
                'notFoundForm' => true,
            ]);
        }

        return $this->renderTemplate($template, [
            "data" => $query,
            "pageTitle" => "Formulario: " . $query["formName"]
        ]);
    }
}
