from datetime import datetime

from django.shortcuts import render
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import WorkoutSerializer, LogSerializer, WorkoutCalendarLogSerializer
from .models import Workout, Exercise, Log, WorkoutCalendarLog
from django.views.decorators.csrf import ensure_csrf_cookie


class WorkoutsView(viewsets.ModelViewSet):
    serializer_class = WorkoutSerializer
    queryset = Workout.objects.all()


@api_view(['GET', 'POST'])
@ensure_csrf_cookie
def logDataView(request):
    if request.method == "GET":
        if request.query_params['param'] == 'latest':
            logs = Log.objects.filter(
                exercise__id=request.query_params["exercise_id"]
            ).reverse()[0]

        elif request.query_params['param'] == 'year':
            fields = ["date", "max"]
            logs = Log.objects.filter(
                exercise__id=request.query_params["exercise_id"]
            ).order_by('date')[:365]

            serializer = LogSerializer(logs, many=True,
                                       fields=fields)
            print(serializer.data[0:len(serializer.data)])

            # Must convert date to Python Date object then *1000 and change
            # 'date' to 'y' and 'max' to 'x'

            response_data = []
            for entry in serializer.data:
                data_item = {}
                data_item['x'] = (entry['date'])[0:10]
                data_item['y'] = entry['max']
                response_data.append(data_item)
                print(data_item)

            return Response(response_data)



        else:
            logs = Log.objects.filter(
                exercise__id=request.query_params["exercise_id"]
            ).order_by('-date')

        serializer = LogSerializer(logs, many=True)

        return Response(serializer.data)

    elif request.method == "POST":
        print(request.data)
        serializer = LogSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            exercise = Exercise.objects.get(pk=serializer.data['exercise'])
            #calendar_log = WorkoutCalendarLog.objects.get(pk=serializer.data['workout_id'])
            #[{"id":1,"title":"Push","areas":"Chest, Anterior Delts, Triceps, Forearms","workout_type":"PU","exercises":[{"id":1,"title":"Pushup","area":"Chest","tips":"retract scapula","sets":4,"reps":10,"iso_hold":7,"max":45,"order_in_workout":0},{"id":4,"title":"Tricep Push-down","area":"Short Head Tricep","tips":"keep elbows to sides","sets":4,"reps":10,"iso_hold":7,"max":15,"order_in_workout":0},{"id":5,"title":"Overhead Tricep Push-down","area":"Long Head Tricep","tips":"keep elbows to ears","sets":4,"reps":10,"iso_hold":7,"max":77,"order_in_workout":0}]},{"id":2,"title":"Pull","areas":"Traps, Lats, Biceps, Medial and Posterior Delts, Rotator Cuffs","workout_type":"PL","exercises":[{"id":2,"title":"Lat Pulldown","area":"Lats","tips":"shift shoulderblades","sets":4,"reps":10,"iso_hold":7,"max":0,"order_in_workout":0}]},{"id":3,"title":"Legs","areas":"Glutes, Quads, Calves, Hamstrings","workout_type":"LG","exercises":[{"id":3,"title":"Pistol Squat","area":"Quads","tips":"Nothing","sets":4,"reps":10,"iso_hold":7,"max":0,"order_in_workout":0}]}]

            serializer_data = serializer.data
            print("yoyoyoyoyoyoyoyoyooy##########################")
            print(serializer.data)
            print(serializer.errors)
            print("yoyoyoyoyoyoyoyoyooy##########################")
            if serializer.data['max'] > exercise.max:
                # old_max = exercise.max
                exercise.max = serializer.data['max']
                exercise.save()
                """
                #Below will compute max comparison on this end and append new PB 
                #message to response - however, as long as we save new max to the 
                #exercises "max" field as above, the data will be included in the 
                #frontend for comparison        
    
                augmented_serializer_data = list(serializer.data)
                augmented_serializer_data.append({'new_pb': (old_max/exercise.max)*100, 'old_pb': old_max})
                serializer_data = augmented_serializer_data
                """

            return Response(serializer_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@ensure_csrf_cookie
def calendarDataView(request):
    if request.method == "GET":
        if request.query_params['param'] == 'latest':
            workout_calendar_logs = WorkoutCalendarLog.objects.filter(
                workout__id=request.query_params["workout"]
            ).reverse()[0]

        elif request.query_params['param'] == 'year':
            workout_calendar_logs = WorkoutCalendarLog.objects.filter(
                workout__id=request.query_params["workout"] # do this 3 times - once for each type of workout
            )[:365] # not necessarily a year, do date diff of 365 days from today

            serializer = WorkoutCalendarLogSerializer(workout_calendar_logs, many=True)

            print(serializer.data[0:len(serializer.data)])

            # Must convert date to Python Date object then *1000 and change
            # 'date' to 'y' and 'max' to 'x'

            response_data = []
            for entry in serializer.data:
                data_item = {}
                data_item['day'] = (entry['date'])[0:10]
                data_item['value'] = entry['workout'] #entry['logs']
                #data_item['workout_id'] = entry['workout']
                response_data.append(data_item)
                print(data_item)

            return Response(response_data)



        else:
            workout_calendar_logs = WorkoutCalendarLog.objects.filter(
                workout__id=request.query_params["workout"]
            ).order_by('-date')

        serializer = WorkoutCalendarLogSerializer(workout_calendar_logs, many=True)

        return Response(serializer.data)

    elif request.method == "POST":
        print(request.data)
        serializer = WorkoutCalendarLogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            serializer_data = serializer.data
            print("yoyoyoyoyoyoyoyoyooy##########################")
            print(serializer.data)
            print(serializer.errors)
            print("yoyoyoyoyoyoyoyoyooy##########################")
            return Response(serializer_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)