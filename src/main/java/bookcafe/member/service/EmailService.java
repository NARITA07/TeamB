package bookcafe.member.service;

 
import javax.inject.Inject;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	@Inject
    private JavaMailSender mailSender;

    @Async
    public void sendMail(SendVO vo) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

            helper.setTo(vo.getSend());
            helper.setFrom(new InternetAddress("your_email@example.com", "BookCafe", "UTF-8"));
            helper.setSubject("BookCafe Email 인증코드");
            helper.setText("이메일 인증 코드: " + vo.getVerificationCode(), true);

            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error occurred while sending email");
        }
    }
    
    @Async
    public void sendMail(String to,String str) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

            helper.setTo(to);
            helper.setFrom(new InternetAddress("your_email@example.com", "BookCafe", "UTF-8"));
            helper.setSubject("BookCafe : "+str);
            helper.setText(to+"님이 "+str, true);

            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error occurred while sending email");
        }
    }
}