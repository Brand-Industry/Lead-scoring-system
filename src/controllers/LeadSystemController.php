<?php

namespace brandindustry\leadscoringsystem\controllers;

use craft\web\Controller;
use yii\web\Response;

use Solspace\Freeform\Freeform;

class LeadSystemController extends Controller
{
    public function actionIndex(): Response
    {
        return $this->renderTemplate('lead-scoring-system/lead-system/index', []);
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
            "dataForm" => $dataFields,
            "handleForm" => $handle,
            "pageTitle" => "Formulario: " . $form->name
        ]);
    }
}
