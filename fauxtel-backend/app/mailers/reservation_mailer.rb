class ReservationMailer < ApplicationMailer


    default from: 'reillyamr@gmail.com'
    
    def reservation_confirmation
        
        @user = params[:user]
        @reservation = params[:reservation]
        
        @url = 'http//localhost:5173/login'
        mail(to: @user.email, subject: "Confirming your reservation!")
    
    end


end
