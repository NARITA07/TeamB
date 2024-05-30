package bookcafe.member.controller;

import java.util.Random;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import bookcafe.member.service.EmailService;
import bookcafe.member.service.SendVO;
 
@Controller
public class EmailController {
    
	@Inject
    JavaMailSender mailSender;

    private EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @RequestMapping("send.do")
    @ResponseBody
    public String send(@RequestParam("send") String email, HttpSession session) {
        SendVO vo = new SendVO();
        vo.setSend(email);

        String verificationCode = generateVerificationCode();
        vo.setVerificationCode(verificationCode);

        session.setAttribute("emailAuthCode", verificationCode);

        emailService.sendMail(vo); // 비동기로 이메일 발송

        return "인증 코드가 이메일로 전송되었습니다.";
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        return String.valueOf(code);
    }
}
