<?php

namespace brandindustry\leadscoringsystem\controllers;

use brandindustry\leadscoringsystem\models\FormQueriesModel;
use brandindustry\leadscoringsystem\records\LeadScoringSystemRecord;
use brandindustry\leadscoringsystem\services\FormQueriesService;
use craft\web\Controller;
use Exception;
use yii\web\Response;
use yii\db\Query;
use Craft;
use yii;

class FormQueriesController extends  Controller
{
  public function actionIndex(): Response
  {
    $context = ["pageTitle" => "Histroial de consultas", "selectedSubnavItem" => "history"];
    return $this->renderTemplate('lead-scoring-system/lead-system/_queries-history', $context);
  }

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
      $message = "Query successfully saved form.";
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

  public function actionGetData($page = 1, $pageSize = 10): Response
  {
    try {
      $query = new Query();
      $query->select([
        'CONCAT(formName, "-", DATE_FORMAT(dateCreated, "%d/%m/%Y")) AS title',
        'uid',
        'dateCreated',
        'formName',
        'formHandle',
        'formData',
        'filterDate',
      ])->from(LeadScoringSystemRecord::tableName())->orderBy(['dateCreated' => SORT_DESC]);

      $results = $query->offset(($page - 1) * $pageSize)
        ->limit($pageSize)
        ->all(Yii::$app->db);

      $totalCount = (int)$query->count('*', Yii::$app->db);

      return $this->asJson([
        "code" => 200,
        "success" => true,
        "message" => "",
        "data" => [
          'items' => $results,
          'pagination' => [
            'total' => (int)$totalCount,
            'page' => (int)$page,
            'pageSize' => (int)$pageSize,
            'pageCount' => ceil($totalCount / $pageSize),
          ],
        ],
      ]);
    } catch (Exception $e) {
      return $this->asJson([
        "error" => "An unexpected error has occurred at the time of collecting the form information, it is possible that the form does not contain information.",
        "More info" => $e,
        "status" => false,
        "code" => 403,
      ]);
    }
  }


  public function actionDeleteItem(): Response
  {
    try {
      $params = Craft::$app->getRequest()->getBodyParams();
      $uuid = $params["uuid"];
      $record = LeadScoringSystemRecord::find()
        ->where(['uid' => $uuid])
        ->one();
      if ($record === null) {
        return $this->asJson([
          'success' => false,
          'message' => 'No record found with that UID',
        ]);
      }
      $record->delete();
      return $this->asJson([
        'success' => true,
        'message' => 'Article successfully removed',
      ]);
    } catch (\Exception $e) {
      return $this->asJson([
        'success' => false,
        "moreInfo" => $e,
        'message' => 'Error when deleting the record',
      ]);
    }
  }
}
