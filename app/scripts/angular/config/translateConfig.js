angular.module('lifeStories').config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: '../../../internationalization/locale-',
        suffix: '.json'
    });
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.preferredLanguage('pt');
    //para trocar lingua use por exemplo $translate.use('en');
    //$translate.proposedLanguage() //pega a lingua padrao
    //$translate.use() //pega a lingua usada
});