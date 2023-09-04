<?php

namespace brandindustry\leadscoringsystem\services;

use brandindustry\leadscoringsystem\models\FormQueriesModel;
use brandindustry\leadscoringsystem\records\LeadScoringSystemRecord;

use Craft;
use craft\base\Component;

class FormQueriesService extends Component
{
  public function saveData(FormQueriesModel $model)
  {
    if ($model->validate()) {
      $record = new LeadScoringSystemRecord();
      $record->formHandle = $model->formHandle;
      $record->formData = $model->formData;
      $record->filterDate = $model->filterDate;

      if ($record->save()) {
        return true;
      } else {
        $model->addErrors($record->getErrors());
      }
    }
    return false;
  }
}
