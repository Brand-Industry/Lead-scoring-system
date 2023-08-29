<?php

namespace tbi\systemleads\controllers;

use craft\web\Controller;
use yii\web\Response;

use Solspace\Freeform\Freeform;

class GetFormController extends Controller
{


    public function actionGetData(): Response
    {
        $request = \Craft::$app->getRequest();
        $handle = $request->getBodyParam('formHandle') ?? null;
        if (empty($handle)) {
            return $this->asJson([
                "message" => "The data provided is incomplete",
                "code" => 403
            ]);
        }
        $form = Freeform::getInstance()->forms->getFormByHandle($handle) ?? null;
        if (empty($form)) {
            return $this->asJson([
                "message" => "Check the parameters the form does not exist",
                "code" => 200
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

        return $this->asJson([
            "code" => 200,
            "data" => $dataFields
        ]);
    }
}
