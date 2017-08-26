angular.module("shared")
.directive("tccStatus", function(){
    return {
        scope: {
            status: "="
        },
        template: `
            <label ng-if="status==='booked'" class="label label-success">Booked</label>
            <label ng-if="status==='overdue'" class="label label-danger">Overdue</label>
            <label ng-if="status==='pending_deposit'" class="label label-warning">Pending Deposit</label>
            <label ng-if="status==='pending_payment'" class="label label-warning">Pending Payment</label>
        `
    }
});