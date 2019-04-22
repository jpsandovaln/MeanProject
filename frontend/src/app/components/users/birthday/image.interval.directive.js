
export default function ImageInterval($interval) {
    function linkFunc(scope, element, attrs) {
        let index = 0;
        let stopTime = $interval(updateTime, 6000);
        function updateTime() {
            if(scope.employees.length === 0) {
                return;
            }
            scope.employee_name = scope.employees[index].firstName + ' ' + scope.employees[index].lastName;
            attrs.$set('src', scope.employees[index].image);
            index++;
            if(index === scope.employees.length)
            {
                index = 0;
            }
        }
        element.on('$destroy', function() {
            $interval.cancel(stopTime);
        });
    }

    return {
        link: linkFunc
    }
}
