require("dotenv").config();
const Joi = require('@hapi/joi');
const moment = require('moment');

function remindFunction(request){
    createNoteRemind(request)
    return render(request, 'home.html')
}
    


function myThread {
    self.deadline = datetime.strptime(self.date, '%Y-%m-%dT%H:%M')
        print(self.deadline)
        # print(datetime.now())
        isAlert5min = False
        alert = "5mins"
        value1 = datetime.now() + timedelta(hours=7) 

        # date_time = value.strftime("%Y-%m-%d")
        print(value1)

        while True:
            value = datetime.now() + timedelta(hours=7) 

            # date_time = value.strftime("%Y-%m-%d")
            # print(value)
            minutes_diff = (self.deadline - value).total_seconds() / 60.0
            isAlert = False
            # print(minutes_diff)

            if minutes_diff< 5 and isAlert5min == False:
                alert = "5mins"
                isAlert5min = True
                isAlert = True
            elif minutes_diff <= 1 and isAlert5min == True:
                alert = "0mins"
                isAlert = True
            if isAlert == True:
                context = {
                    "nameTask" : self.taskname,
                    "userCreate" : self.user,
                    "subject" : self.subject,
                    "message" : self.message,
                    "email" : self.email,
                    "deadline" : self.date,
                    "alert": alert
                    }
                print("oke")
                isAlert = False
                self.sendmail(self.request, context)
                if alert == "0mins":
                    return
    def __init__(self, user, taskname,subject, date, email, message, request):
        # print(datetime.today().date)
        threading.Thread.__init__(self)
        self.user = user
        self.subject = subject
        self.taskname = taskname
        self.date = date
        self.email = email
        self.message = message
        self.request = request

    def run(self):
        
    def sendmail(self, request, context):
        import json
        resp = requests.post('http://127.0.0.1:9999/api/v1/sendmail', data = json.dumps(context), headers={"Content-Type":"application/json"})
        print(resp.text)
        return resp
        # return HttpResponse('Hello, async world!')
        
}