from django.shortcuts import render

def test(request):
    return render(request,'cms/test_app.html')