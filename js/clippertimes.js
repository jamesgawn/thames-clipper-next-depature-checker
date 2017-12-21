/**
 * Created by Akyan on 13/01/2015.
 */

function createTime(hours, minutes)
{
    var date = new Date();
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(minutes);
    date.setHours(hours);
    return date;
}

function ClipperTrip(departureHour, departureMinute, arrivalHour, arrivalMinute)
{
    this.departureTime = createTime(departureHour, departureMinute);
    this.arrivalTime = createTime(arrivalHour, arrivalMinute);
}

var myClipperApp = angular.module('myClipperApp',['ngTouch']);

myClipperApp.controller('nextClipperController', ['$scope', '$interval', function($scope, $interval) {

    $scope.showSimple = true;

    $scope.westbound = [
        new ClipperTrip(6,16,6,38),
        new ClipperTrip(6,46,7,08),
        new ClipperTrip(7,16,7,38),
        new ClipperTrip(7,46,8,08),
        new ClipperTrip(8,06,8,28),
        new ClipperTrip(8,26,8,48),
        new ClipperTrip(8,46,9,08),
        new ClipperTrip(9,06,9,28),
        new ClipperTrip(9,36,9,58),
        new ClipperTrip(9,58,10,17),
        new ClipperTrip(10,23,10,42),
        new ClipperTrip(10,53,11,12),
        new ClipperTrip(11,23,11,42),
        new ClipperTrip(11,43,12,02),
        new ClipperTrip(12,03,12,22),
        new ClipperTrip(12,23,12,42),
        new ClipperTrip(12,43,13,02),
        new ClipperTrip(13,03,13,22),
        new ClipperTrip(13,23,13,42),
        new ClipperTrip(13,43,14,02),
        new ClipperTrip(14,03,14,22),
        new ClipperTrip(14,23,14,42),
        new ClipperTrip(14,43,15,02),
        new ClipperTrip(15,03,15,22),
        new ClipperTrip(15,23,15,42),
        new ClipperTrip(15,43,16,02),
        new ClipperTrip(16,03,16,22),
        new ClipperTrip(16,23,16,42),
        new ClipperTrip(16,43,17,02),
        new ClipperTrip(17,08,17,27),
        new ClipperTrip(17,28,17,47),
        new ClipperTrip(17,48,18,07),
        new ClipperTrip(18,08,18,27),
        new ClipperTrip(18,28,18,47),
        new ClipperTrip(18,48,19,07),
        new ClipperTrip(19,08,19,27),
        new ClipperTrip(19,28,19,47),
        new ClipperTrip(19,48,20,07),
        new ClipperTrip(20,08,20,27),
        new ClipperTrip(20,28,20,47),
        new ClipperTrip(21,28,21,47),
        new ClipperTrip(22,28,22,47)
    ]

    $scope.eastbound = [
        new ClipperTrip(7,18,7,34),
        new ClipperTrip(7,48,8,04),
        new ClipperTrip(8,18,8,34),
        new ClipperTrip(8,48,9,04),
        new ClipperTrip(9,08,9,24),
        new ClipperTrip(9,28,9,44),
        new ClipperTrip(9,48,10,04),
        new ClipperTrip(10,08,10,24),
        new ClipperTrip(10,42,11,02),
        new ClipperTrip(11,00,11,20),
        new ClipperTrip(11,25,11,45),
        new ClipperTrip(11,55,12,15),
        new ClipperTrip(12,25,12,45),
        new ClipperTrip(12,45,13,05),
        new ClipperTrip(13,05,13,25),
        new ClipperTrip(13,25,13,45),
        new ClipperTrip(13,45,14,05),
        new ClipperTrip(14,05,14,25),
        new ClipperTrip(14,25,14,45),
        new ClipperTrip(14,45,15,05),
        new ClipperTrip(15,05,15,25),
        new ClipperTrip(15,25,15,45),
        new ClipperTrip(15,45,16,05),
        new ClipperTrip(16,05,16,25),
        new ClipperTrip(16,25,16,45),
        new ClipperTrip(16,45,17,05),
        new ClipperTrip(17,05,17,25),
        new ClipperTrip(17,25,17,45),
        new ClipperTrip(17,45,18,05),
        new ClipperTrip(18,10,18,30),
        new ClipperTrip(18,30,18,50),
        new ClipperTrip(18,50,19,10),
        new ClipperTrip(19,10,19,30),
        new ClipperTrip(19,30,19,50),
        new ClipperTrip(19,50,20,10),
        new ClipperTrip(20,10,20,30),
        new ClipperTrip(20,30,20,50),
        new ClipperTrip(20,50,21,10),
        new ClipperTrip(21,10,21,30),
        new ClipperTrip(21,30,21,50),
        new ClipperTrip(22,30,22,50),
        new ClipperTrip(23,30,23,50)
    ]

    function tripStartsInFuture(element)
    {
        var currentDate = new Date();

        return element.departureTime > currentDate;
    }

    function timeUntil(trip)
    {
        var diff = trip.departureTime - new Date;

        var msec = diff;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        var ss = Math.floor(msec / 1000);
        msec -= ss * 1000;

        if (hh > 0)
        {
            return hh + " Hours, " + mm + " Minutes, " + ss + " Seconds";
        }
        else if (mm > 0)
        {
            return mm + " Minutes, " + ss + " Seconds";
        }
        else if (ss > 0)
        {
            return ss + " Seconds";
        }

    }

    function retrieveNextBoat(direction, trips, number)
    {
        var futureTrips = trips.filter(tripStartsInFuture);

        if (futureTrips.length > 0)
        {
            return futureTrips.slice(0,number).map(function(time) {
                return new Trip(time, direction);
            });
        }
        else
        {
            return "No more boats....";
        }
    }

    function Trip(trip, direction)
    {
        this.trip = trip;
        this.timeUntil = timeUntil(trip);
        this.direction = direction;
    }

    function magicRetrieveNextNBoats(number)
    {
        var currentDate = new Date();

        if (currentDate.getHours() > 12)
        {
            return retrieveNextBoat("Eastbound", $scope.eastbound,number);
        }
        else
        {
            return retrieveNextBoat("Westbound", $scope.eastbound,number);
        }
    }

    function updateBoats(){
        $scope.trips = magicRetrieveNextNBoats(3);
        $scope.trip = $scope.trips[0];
        $scope.direction = $scope.trips[0].direction;
    }

    updateBoats();

    $interval(updateBoats,60);

    $scope.switchView = function() {

            $scope.showSimple = !$scope.showSimple;

    };

}]);