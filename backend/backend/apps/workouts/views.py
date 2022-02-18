from django.shortcuts import render
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import WorkoutSerializer, LogSerializer
from .models import Workout, Exercise, Log
from django.views.decorators.csrf import ensure_csrf_cookie


class WorkoutsView(viewsets.ModelViewSet):
    serializer_class = WorkoutSerializer
    queryset = Workout.objects.all()


@api_view(['GET', 'POST'])
@ensure_csrf_cookie
def logDataView(request):

    if request.method== "GET":
        if request.query_params['param'] == 'latest':
            logs = Log.objects.filter(
                exercise_id__id=request.query_params["exercise_id"]
            ).reverse()[0]

        elif request.query_params['param'] == 'year':
            fields = ["date","max"]
            logs = Log.objects.filter(
                    exercise_id__id=request.query_params["exercise_id"]
                ).order_by('-date')[:365]

            serializer = LogSerializer(logs, many=True,
                                          fields=fields)
            print(serializer.data)
            return Response(serializer.data)



        else:
            logs = Log.objects.filter(
                exercise_id__id=request.query_params["exercise_id"]
            ).order_by('-date')

        serializer = LogSerializer(logs, many=True)

        return Response(serializer.data)

    elif request.method== "POST":

        serializer = LogSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            exercise = Exercise.objects.get(pk=serializer.data['exercise_id'])
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


