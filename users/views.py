# users/views.py
from django.urls import reverse_lazy
from django.views import generic
from django.contrib import messages
from users.models import CustomUser

from users.forms import CustomUserCreationForm

class SignUpView(generic.CreateView):
    model = CustomUser
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('first-home')
    template_name = 'users/signup_form.html'

    def post(self, request, *args, **kwargs):
        """
        Handle POST requests: instantiate a form instance with the passed
        POST variables and then check if it's valid.
        """
        self.object = None
        form = self.get_form()
        if form.is_valid():
            form.save()
            name = form.cleaned_data.get('first_name')
            messages.success(request,f'Account created for {name}!')
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

signup_view = SignUpView.as_view()
