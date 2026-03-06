from django.urls import path
from .views import NoteListCreate, NoteDetail

urlpatterns = [

    path('notes/', NoteListCreate.as_view()),

    path('notes/<int:pk>/', NoteDetail.as_view()),

]