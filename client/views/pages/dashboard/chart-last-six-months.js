Template.chartLastSixMonths.onCreated(function() {

});

Template.chartLastSixMonths.onRendered(function(){
    var instance = Template.instance();
    instance.report = [];
    Meteor.call("pointsLastSixMonths", function(err, report) {
        if(err) throw err;
        var labels = [];
        var you = [];
        _.each(report, function(m) {
            var month = moment(new Date(m.year+"-" + m.month + "-01")).format("MMM");
            labels.push(month);
            you.push(m.score);
        });
        var lineData = {
            labels: labels,
            datasets: [
                {
                    label: "Industry Average",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [3.4, 2.5, 3.5, 4.2, 4.6, 4.3]
                },
                {
                    label: "You",
                    fillColor: "rgba(26,179,148,0.5)",
                    strokeColor: "rgba(26,179,148,0.7)",
                    pointColor: "rgba(26,179,148,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(26,179,148,1)",
                    data: you
                }
            ]
        };

        var lineOptions = {
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            bezierCurve: true,
            bezierCurveTension: 0.4,
            pointDot: true,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            responsive: true
        };


        var ctx = document.getElementById("lastSixMonths").getContext("2d");
        new Chart(ctx).Line(lineData, lineOptions);
    });


});