from django.shortcuts import render
from rest_framework import viewsets
from .serializers import WorkoutSerializer
from .models import Workout

class WorkoutsView(viewsets.ModelViewSet):
    serializer_class = WorkoutSerializer
    queryset = Workout.objects.all()

class WorkoutsDataView(viewsets.ModelViewSet):
    serializer_class = WorkoutSerializer
    queryset = Workout.objects.all()
