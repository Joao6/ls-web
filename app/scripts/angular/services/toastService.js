angular.module('lifeStories').service('toast', function () {

    this.toastSuccess = (message, duration) => {
        $.toast({
            text: "<strong style='font-size: 12pt'>" +  message +"</strong>",                        
            icon: 'success',
            loader: true,
            loaderBg: '#0ca8ad',
            position: 'top-right',
            hideAfter: duration,
            bgColor: '#278412'
        })
    }

    this.toastError = (message, duration) => {
        $.toast({
            text: "<strong style='font-size: 12pt'>" +  message +"</strong>",                           
            icon: 'error',
            loader: true, 
            loaderBg: '#0ca8ad', 
            position: 'top-right',
            hideAfter: duration,
            bgColor: '#841212'
        })
    }

    this.toastWarning = (message, duration) => {
        $.toast({
            text: "<strong style='font-size: 12pt'>" +  message +"</strong>",                                
            icon: 'warning',
            loader: true,
            loaderBg: '#0ca8ad',
            position: 'top-right',
            hideAfter: duration,
            bgColor: '#FFDB2F'
        })
    }

    this.toastInfo = (message, duration) => {
        $.toast({
            text: "<strong style='font-size: 12pt'>" +  message +"</strong>",                              
            icon: 'info',
            loader: true,
            loaderBg: '#0ca8ad',
            position: 'top-right',
            hideAfter: duration,
            bgColor: '#126f84'
        })
    }

})