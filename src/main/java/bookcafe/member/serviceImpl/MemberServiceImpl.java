package bookcafe.member.serviceImpl;
	
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Resource;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import bookcafe.member.service.MemberService;
import bookcafe.member.service.MemberVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
	
@Service("memberService") 
public class MemberServiceImpl extends EgovAbstractServiceImpl implements MemberService {

@Resource(name = "memberMapper") 
MemberMapper memberMapper;
 
private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//!
    /* 회원가입 */
    @Override
    public String insertMember(MemberVO memberVO) throws Exception {
        memberVO.setUser_pass(passwordEncoder.encode(memberVO.getUser_pass())); // 비밀번호 암호화
        int result = memberMapper.insertMember(memberVO);
        return result > 0 ? "ok" : "fail";
    }

    /*로그인*/
    @Override
    public int loginProc(MemberVO memberVO) {
        MemberVO storedMemberVO = memberMapper.getUserInfo(memberVO.getUser_id());
        if (storedMemberVO != null) {
            if (storedMemberVO.getUser_authority().equals("5")) {
                return -1; // 탈퇴한 회원
            }
            if (passwordEncoder.matches(memberVO.getUser_pass(), storedMemberVO.getUser_pass())) {
                return 1; // 로그인 성공
            } else {
                return 0; // 비밀번호 불일치
            }
        } else {
            return 0; // 아이디 없음
        }
    }
    
    /*아이디 중복체크*/
    @Override 
    public int selectIdChk(String user_id) { 
        return memberMapper.selectIdChk(user_id); 
    }
    
    /* 마지막으로 id 한번더 체크 */
    @Override
    public boolean checkIdExists(String user_id) {
        int count = memberMapper.checkIdExists(user_id);
        return count > 0;
    }
    
    /* 마지막으로 tel 한번더 체크 */
    @Override
    public boolean checkTelExists(String user_tel) {
        int count = memberMapper.checkTelExists(user_tel);
        return count > 0;
    }

    /* 아이디 찾기 */
    @Override
    public String findId(String userName, String userEmail) throws Exception {
        return memberMapper.findId(userName, userEmail);
    }

    /* 비밀번호 찾기 */
    @Override
    public boolean findPw(String userId, String userName, String userTel) throws Exception {
        int count = memberMapper.findPw(userId, userName, userTel);
        return count > 0;
    }

    /* 비밀번호 재설정 */
    @Override
    public boolean resetPassword(String userId, String newPassword) throws Exception {
        int result = memberMapper.resetPassword(userId, passwordEncoder.encode(newPassword)); // 비밀번호 암호화
        return result > 0;
    }

    /* 네이버 로그인 */
    @Override
    public String insertNaverMember(MemberVO memberVO) throws Exception {
        memberVO.setUser_joindate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));

        // 주소나 필수가 아닌 정보가 누락된 경우 기본값 할당
        if(memberVO.getUser_address() == null) {
            memberVO.setUser_address("기본 주소");
        }

        int result = memberMapper.insertNaverMember(memberVO);
        return result > 0 ? "ok" : "fail";
    }
    
    /* 네이버 아이디 확인 */
    @Override
    public int selectSnsIdChk(String user_sns_id) {
        return memberMapper.selectSnsIdChk(user_sns_id);
    }	
    
 // 회원정보 조회하기
 	@Override
 	public MemberVO getUserInfo(String user_id) {
 		MemberVO memberVO = memberMapper.getUserInfo(user_id);
 		return memberVO;
 	}
 	
    /* 회원 메일 받아오기 */
	@Override
	public String selectMemberEmail(String user_code) {
		System.out.println(user_code);
		return memberMapper.selectMemberEmail(user_code);
	}
	
	/* 네이버 회원정보 조회*/
	@Override
	public MemberVO getUserInfoBySnsId(String user_sns_Id) {
		MemberVO memberVO = memberMapper.getUserInfoBySnsId(user_sns_Id);
 		return memberVO;
	}

}