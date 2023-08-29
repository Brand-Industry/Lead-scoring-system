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
    public static $plugin;

    /*public static function instance()*/
    /*{*/
    /*return Craft::$app->getPlugins()->getPlugin('craftleadscoringsystem');*/
    /*}*/

    public function init()
    {
        parent::init();

        self::$plugin = $this;
        $this->_registerVariables();

        // Defer most setup tasks until Craft is fully initialized
        /*\Craft::$app->on('beforeInit', function () {*/
        /*$this->attachEventHandlers();*/
        /*});*/
    }


    public function getPluginName()
    {
        return $this->getSettings()->pluginName;
    }

    public function getSettingsResponse()
    {
        Craft::$app->getResponse()->redirect(UrlHelper::cpUrl('lead-scoring-system/settings'));
    }

    protected function createSettingsModel(): ?Model
    {
        return new Settings();
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

    /*private function attachEventHandlers(): void*/
    /*{*/
    /*// Register event handlers here ...*/
    /*// (see https://craftcms.com/docs/3.x/extend/events.html to get started)*/
    /*}*/
}
