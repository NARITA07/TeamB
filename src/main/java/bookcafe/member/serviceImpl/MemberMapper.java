package bookcafe.member.serviceImpl;

import bookcafe.member.service.MemberVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("memberMapper")
public interface MemberMapper {    

	int loginProc(MemberVO memberVO);

	int selectIdChk(String user_id);
}