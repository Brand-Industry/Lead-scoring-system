<?php

namespace brandindustry\leadscoringsystem\models;

use brandindustry\leadscoringsystem\records\LeadScoringSystemRecord;
use craft\base\Model;
use craft\helpers\Json;

class FormQueriesModel extends Model
{
    public $formHandle;
    public $formData;
    public $filterDate;

    public function rules()
    {
        return [
            [['formHandle', 'formData'], 'required'],
            ['formHandle', 'string', 'max' => 255],
            ['formData', 'validateJson'],
            ['filterDate', 'validateJson'],
        ];
    }


    public function validateJson($attribute, $params, $validator)
    {
        $value = $this->$attribute;
        if (!empty($value) && !Json::isJsonObject(json_encode($value))) {
            $this->addError($attribute, 'The field must be a valid JSON.');
        }
    }
}
