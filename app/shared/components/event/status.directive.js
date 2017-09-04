angular.module("components")
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
            <label ng-if="status==='pending_approval'" class="label label-warning">Pending Approval</label>
            <label ng-if="status==='terminated'" class="label label-default">Terminated</label>
            <label ng-if="status==='canceled'" class="label label-default">Canceled</label>
            <label ng-if="status==='past'" class="label label-default">Past</label>
            <label ng-if="status==='past'" class="label label-default">Past</label>
        `
    }
});