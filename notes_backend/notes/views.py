from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Note
from .serializers import NoteSerializer


class NoteListCreate(APIView):

    def get(self, request):

        notes = Note.objects.all()

        serializer = NoteSerializer(notes, many=True)

        return Response(serializer.data)


    def post(self, request):

        serializer = NoteSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors)
    
class NoteDetail(APIView):

    def get_object(self, pk):

        try:
            return Note.objects.get(pk=pk)
        except Note.DoesNotExist:
            return None


    def get(self, request, pk):

        note = self.get_object(pk)

        serializer = NoteSerializer(note)

        return Response(serializer.data)


    def put(self, request, pk):

        note = self.get_object(pk)

        serializer = NoteSerializer(note, data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors)


    def delete(self, request, pk):

        note = self.get_object(pk)

        note.delete()

        return Response({"message": "Note deleted"})