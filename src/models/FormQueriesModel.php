<?php

namespace tbi\systemleads\models;

use craft\base\Model;
use craft\helpers\Json;

class FormQueriesModel extends Model
{
    public $Date;
    public $FormHandle;
    public $FormData;
    public $FiltersDate;

    public function rules()
    {
        return [
            [['Date', 'FormHandle', 'FormData'], 'required'],
            ['FormHandle', 'string', 'max' => 255],
            ['FormData', 'validateJson'],
            ['FilterDate', 'validateJson'],
        ];
    }


    public function validateJson($attribute, $params, $validator)
    {
        $value = $this->$attribute;
        if (!empty($value) && !Json::isJson($value)) {
            $this->addError($attribute, 'The field must be a valid JSON.');
        }
    }

    /*public function validateFormData($attribute, $params, $validator)*/
    /*{*/
    /*foreach ($this->$attribute as $item) {*/
    /*if (*/
    /*!isset($item['field']) || !isset($item['operator'])*/
    /*|| !isset($item['value']) || !isset($item['points'])*/
    /*) {*/
    /*$this->addError($attribute, 'The FormDate structure is invalid.');*/
    /*return;*/
    /*}*/
    /*}*/
    /*}*/

    /*public function validateFilterDate($attribute, $params, $validator)*/
    /*{*/
    /*if ($this->$attribute !== null) {*/
    /*if (!isset($this->$attribute['type']) || !isset($this->$attribute['date'])) {*/
    /*$this->addError($attribute, 'The FilterDate structure is invalid.');*/
    /*}*/
    /*}*/
    /*}*/
}
