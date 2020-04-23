class UserMailer < ApplicationMailer
    default from: 'notifications@fauxtels.com'
    def welcome_email
        @user = params[:user]
        @url = 'http//localstorage:3001/login'
        mail (to: @user.email, subject: 'Welcome to Fauxtels!')
    end
end
