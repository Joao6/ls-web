function callElderly(id) {
    angular.element(document.getElementById('viewDiv')).scope().callElderly(id);
    window.location.href = '#/student/call';
}