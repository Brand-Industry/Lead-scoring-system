<?php

namespace brandindustry\leadscoringsystem\controllers;

use brandindustry\leadscoringsystem\models\FormQueriesModel;
use brandindustry\leadscoringsystem\services\FormQueriesService;
use craft\web\Controller;
use Exception;
use yii\web\Response;
use Craft;

class FormQueriesController extends  Controller
{
  public function actionSaveData(): Response
  {
    try {
      $this->requirePostRequest();
      $params = Craft::$app->getRequest()->getBodyParams();
      if (empty($params["formHandle"]) || empty($params["formData"])) {
        return $this->asJson([
          "message" => "The data provided is incomplete",
          "code" => 403,
          "success" => false
        ]);
      }
      $model = new FormQueriesModel();
      $model->load($params, '');
      $service = new FormQueriesService();
      $message = "Query successfully saved form...";
      $status = true;
      if ($service->saveData($model)) {
        Craft::$app->getSession()->setNotice($message);
      } else {
        $message = "Failed to save the form Query...";
        $status = false;
        Craft::$app->getSession()->setError($message);
      }
      return $this->asJson([
        "code" => 200,
        "message" => $message,
        "success" => $status
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
