<?php

namespace brandindustry\leadscoringsystem;

use brandindustry\leadscoringsystem\models\Settings;
use brandindustry\leadscoringsystem\variables\LeadScoringSystemVariable;

//Craft
use Craft;
use craft\base\Model;
use craft\base\Plugin;
use craft\helpers\UrlHelper;
use craft\web\twig\variables\CraftVariable;


use yii\base\Event;
use craft\web\UrlManager;
use craft\events\RegisterUrlRulesEvent;


/**
 * Lead Scoring System plugin
 *
 * @property Settings $settings
 * @method Settings getSettings()
 * @deprecated in Craft 3.1
 */
class LeadScoringSystem extends Plugin
{
    public $schemaVersion = '1.0.0';
    public $hasCpSettings = true;
    public $hasCpSection = true;
    public static $plugin;

    public static function instance()
    {
        return Craft::$app->getPlugins()->getPlugin('craftleadscoringsystem');
    }

    public function init()
    {
        parent::init();

        self::$plugin = $this;
        $this->_registerVariables();
        $this->_registerCpRoutes();
    }


    public function getPluginName()
    {
        return $this->getSettings()->pluginName;
    }

    public function getCpNavItem(): ?array
    {
        $navItem = parent::getCpNavItem();
        $navItem = array_merge($navItem, [
            'subnav' => [
                "General" => [
                    'label' => 'Formularios',
                    'url' => 'lead-scoring-system',
                ],
                "consultationHistory" => [
                    'label' => 'Historial de consultas',
                    'url' => 'lead-scoring-system/consultation-history',
                ]
            ],
        ]);
        return $navItem;
    }

    public function getSettingsResponse()
    {
        Craft::$app->getResponse()->redirect(UrlHelper::cpUrl('lead-scoring-system/settings'));
    }

    protected function createSettingsModel(): ?Model
    {
        return new Settings();
    }


    private function _registerCpRoutes()
    {
        Event::on(UrlManager::class, UrlManager::EVENT_REGISTER_CP_URL_RULES, function (RegisterUrlRulesEvent $event) {
            $event->rules = array_merge($event->rules, [
                'lead-scoring-system' => 'lead-scoring-system/lead-system/index',
                'lead-scoring-system/form/<handle:{handle}>' => 'lead-scoring-system/lead-system/form',
                'lead-scoring-system/get-submits/submission' => 'lead-scoring-system/get-submits/submission',
                'lead-scoring-system/form-queries/save-query' => 'lead-scoring-system/form-queries/save-data',
            ]);
        });
    }

    private function _registerVariables()
    {
        Event::on(CraftVariable::class, CraftVariable::EVENT_INIT, function (Event $event) {
            $event->sender->set('leadSystem', LeadScoringSystemVariable::class);
        });
    }

    /*protected function settingsHtml(): string*/
    /*{*/
    /*return \Craft::$app->view->renderTemplate('lead-scoring-system/settings/index.twig', [*/
    /*'plugin' => $this,*/
    /*'settings' => $this->getSettings(),*/
    /*]);*/
    /*}*/
}
