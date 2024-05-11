class UserMailer < ApplicationMailer
    
    default from: 'reillyamr@gmail.com'
    
    def welcome_email
        
        @user = params[:user]
        @url = 'http//localhost:3000/login'
        mail(to: @user.email, subject: "Welcome to Fauxtels!")
    
    end
end
