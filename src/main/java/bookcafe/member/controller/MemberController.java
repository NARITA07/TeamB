package bookcafe.member.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import bookcafe.member.service.MemberService;
import bookcafe.member.service.MemberVO;

@Controller
public class MemberController { 

@Resource(name = "memberService")
public MemberService memberService;

private final String clientId = "KFlxuf0Rhy_fUBNEU_1e";
private final String clientSecret = "3eFou5WWJ5";
private final String redirectURI = "http://localhost:8082/callback.do";
private final String state = "randomState"; // CSRF 방지를 위한 상태 코드
//!
   /* 회원 등록 페이지 호출 */
   @RequestMapping("memberWrite.do") 
   public String MemberWrite() { 
       return "/member/memberWrite"; 
   }
   
   /* 회원 가입 처리 */
   @RequestMapping("memberWriteSave.do")
   @ResponseBody
   public String insertMember(MemberVO memberVO) throws Exception {
      
       String message = memberService.insertMember(memberVO);
       return message;
   }
   
   /* 아이디 중복 체크 */
   @RequestMapping("idChk.do")
   @ResponseBody
   public String selectIdChk(String user_id) throws Exception {
       String message = "";
       System.out.println("user_id :" + user_id);
       int cnt = memberService.selectIdChk(user_id);
       if (cnt == 0) {
           message = "ok";
       }
       return message;
   }
   
   /* 회원가입 시 마지막으로 id,tel 한번더체크 */
   @PostMapping("/checkDuplicates.do")
    @ResponseBody
    public String checkDuplicates(@RequestParam String user_id, @RequestParam String user_tel) {
        Map<String, Boolean> response = new HashMap<>();
        boolean idExists = memberService.checkIdExists(user_id); // 아이디 중복 확인
        boolean telExists = memberService.checkTelExists(user_tel); // 전화번호 중복 확인
        response.put("idExists", idExists);
        response.put("telExists", telExists);

        JSONObject json = new JSONObject(response);
        return json.toString();
    }
   
   /* 로그인 페이지 */
   @RequestMapping("login.do") 
   public String login() { 
       return "/member/login"; 
   }
   
   /* 로그인 */
   @RequestMapping("loginProc.do")
   @ResponseBody
   public String loginProc(MemberVO memberVO, HttpSession session) throws Exception {
       String message = "";
       int cnt = memberService.selectIdChk(memberVO.getUser_id());
       if (cnt == 0) { // 아이디가 없습니다.
           message = "x";
       } else {
           int loginResult = memberService.loginProc(memberVO);
           if (loginResult == 1) {
               MemberVO loginInfo = memberService.getUserInfo(memberVO.getUser_id());
               session.setAttribute("sessionId", memberVO.getUser_id());
               session.setAttribute("loginInfo", loginInfo);
               message = "ok"; // 로그인 성공
           } else if (loginResult == 0) {
               message = "wrong password"; // 패스워드가 틀렸습니다.
           } else if (loginResult == -1) {
               message = "withdrawn"; // 탈퇴한 회원
           }
       }
       System.out.println(message);
       return message;
   }
   
   /* 로그아웃 */
   @RequestMapping("logout.do")
   public String logout(HttpSession session) {
       String accessToken = (String) session.getAttribute("accessToken");
       if (accessToken != null) {
           // 네이버 로그아웃 API 호출
           String apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=" + clientId
                   + "&client_secret=" + clientSecret + "&access_token=" + accessToken + "&service_provider=NAVER";
           try {
               HttpURLConnection conn = (HttpURLConnection) new URL(apiURL).openConnection();
               conn.setRequestMethod("GET");
               int responseCode = conn.getResponseCode();
               if (responseCode == 200) { // 로그아웃 성공
                   System.out.println("네이버 로그아웃 성공");
               } else {
                   System.out.println("네이버 로그아웃 실패");
               }
           } catch (Exception e) {
               e.printStackTrace();
           }
       }
       // 세션 무효화
       session.invalidate();
       return "redirect:/";
   }
   
   /* 아이디 및 비밀번호 찾기 페이지 이동 */
   @RequestMapping("findIdPwForm.do")
   public String findIdPwForm() {
       return "/member/findIdPwForm";
   }
   
   /* 아이디 찾기 처리 */
   @RequestMapping("findId.do")
   @ResponseBody
   public String findId(@RequestParam("user_name") String userName, @RequestParam("user_email") String userEmail) throws Exception {
       String userId = memberService.findId(userName, userEmail);
       return userId != null ? userId : "not found";
   }
   
   /* 비밀번호 찾기 처리 */
   @RequestMapping("findPw.do")
   @ResponseBody
   public String findPw(@RequestParam("user_id") String userId, @RequestParam("user_name") String userName, @RequestParam("user_tel") String userTel) throws Exception {
       boolean userExists = memberService.findPw(userId, userName, userTel);
       return userExists ? "found" : "not found";
   }
   
   /* 비밀번호 재설정 */
   @RequestMapping("resetPassword.do")
   @ResponseBody
   public String resetPassword(@RequestParam("user_id") String userId, @RequestParam("new_password") String newPassword) throws Exception {
       boolean success = memberService.resetPassword(userId, newPassword);
       return success ? "success" : "fail";
   }
   
   @RequestMapping("verifyCode.do")
   @ResponseBody
   public String verifyCode(@RequestParam("verificationCode") String verificationCode, HttpSession session) {
       String sessionCode = (String) session.getAttribute("verificationCode");
   
       if (verificationCode.equals(sessionCode)) {
           return "ok";
       } else {
           return "fail";
       }
   }
   
   @RequestMapping("checkEmailAuthCode.do")
   @ResponseBody
   public String checkEmailAuthCode(@RequestParam("emailAuthCode") String emailAuthCode, HttpSession session) {
       String sessionCode = (String) session.getAttribute("emailAuthCode");
   
       if (emailAuthCode.equals(sessionCode)) {
           return "ok";
       } else {
           return "fail";
       }
   }
   
   /* 네이버 로그인 */
   @RequestMapping("naverLogin.do")
   public String naverLogin(HttpSession session) {
       session.setAttribute("state", state);
       String apiURL = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" + clientId
               + "&redirect_uri=" + redirectURI + "&state=" + state;
       return "redirect:" + apiURL;
   }
   
   @GetMapping("/callback.do")
    public RedirectView naverCallback(@RequestParam(value = "code", required = false) String code, 
                                      @RequestParam(value = "state", required = false) String state, 
                                      @RequestParam(value = "error", required = false) String error,
                                      @RequestParam(value = "error_description", required = false) String errorDescription,
                                      HttpSession session,
                                      RedirectAttributes redirectAttributes) throws Exception {
        if (error != null && error.equals("access_denied")) {
            redirectAttributes.addFlashAttribute("errorMessage", "네이버 로그인이 취소되었습니다.");
            return new RedirectView("login.do");
        }

        String storedState = (String) session.getAttribute("state");
        if (!state.equals(storedState)) {
            throw new IllegalStateException("Invalid state parameter");
        }

        String apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" + clientId
                + "&client_secret=" + clientSecret + "&code=" + code + "&state=" + state;

        HttpURLConnection conn = (HttpURLConnection) new URL(apiURL).openConnection();
        conn.setRequestMethod("POST");
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = br.readLine()) != null) {
            response.append(inputLine);
        }
        br.close();

        JSONObject json = new JSONObject(response.toString());
        String accessToken = json.getString("access_token");

        String header = "Bearer " + accessToken;
        String userInfoApiURL = "https://openapi.naver.com/v1/nid/me";
        conn = (HttpURLConnection) new URL(userInfoApiURL).openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Authorization", header);
        br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        response = new StringBuffer();
        while ((inputLine = br.readLine()) != null) {
            response.append(inputLine);
        }
        br.close();

        json = new JSONObject(response.toString());
        JSONObject responseJson = json.getJSONObject("response");
        String userId = responseJson.getString("id");
        String userName = responseJson.getString("name");
        String userEmail = responseJson.getString("email");
        String userTel = responseJson.optString("mobile", "000-0000-0000");
        String userAddress = responseJson.optString("address", "주소 없음");

        MemberVO memberVO = new MemberVO();
        memberVO.setUser_sns_id(userId);
        memberVO.setUser_name(userName);
        memberVO.setUser_email(userEmail);
        memberVO.setUser_tel(userTel);
        memberVO.setUser_address(userAddress);
        memberVO.setUser_authority("1");
        
        boolean checkTelExists = memberService.checkTelExists(userTel);
        if (checkTelExists == true) {
           redirectAttributes.addFlashAttribute("errorMessage", "이미 가입한 회원입니다.");
            return new RedirectView("login.do");
        }
        
        int userExists = memberService.selectSnsIdChk(userId);
        if (userExists == 0) {
            memberService.insertNaverMember(memberVO);
        }

        session.setAttribute("sessionId", userId);
        session.setAttribute("accessToken", accessToken);
        session.setAttribute("loginInfo", memberVO);

      return new RedirectView("/");
    }
}