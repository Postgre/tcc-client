angular.module("shared")
.directive("tccConfig", function(){
    return {
        scope: {
            config: "="
        },
        template: `
            <label ng-if="config==='trio_sab'"  ng-class="class" class="label">Trio (S,A,B)</label>
            <label ng-if="config==='trio_stb'"  ng-class="class" class="label">Trio (S,T,B)</label>
            <label ng-if="config==='quartet'"   ng-class="class" class="label">Quartet</label>
            <label ng-if="config==='sextet'"    ng-class="class" class="label">Sextet</label>
            <label ng-if="config==='octet'"     ng-class="class" class="label">Octet</label>
        `,
        controller: function(scope){
            scope.class = "label-default";
        }
    }
});