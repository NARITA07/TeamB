package bookcafe.point.serviceImpl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.member.service.MemberVO;
import bookcafe.member.serviceImpl.MemberMapper;
import bookcafe.point.service.PointService;
import bookcafe.point.service.PointVO;

@Service
public class PointServiceImpl implements PointService {
	
	@Autowired
	private PointMapper pointMapper;
	
	@Autowired
	private MemberMapper memberMapper;
	
	// 포인트 전체 조회하기(한사람)
	@Override
	public List<PointVO> getPointList(String user_id) {
		List<PointVO> pointVOList = pointMapper.getPointList(user_id);
		return pointVOList;
	}

	// 포인트 내역 기록
	@Override
	public int insertPointLog(PointVO pointVO) {
		int insertP_result = pointMapper.insertPointLog(pointVO);
		if (insertP_result == 1) {
			//포인트 테이블에 기록될때 회원포인트도 업데이트
			String user_code = pointVO.getUser_code();
//			String user_id = memberMapper
//			MemberVO memberVO = memberMapper.getUserInfo()
			int userP_result = pointMapper.updateUserPoint(user_code);
			System.out.println("userP_result" + userP_result);
		}
		return insertP_result;
	}
	
	// 회원 포인트 업데이트
	@Override
	public int updateUserPoint(String user_code) {
		int result = pointMapper.updateUserPoint(user_code);
		return result;
	}
	
	// 포인트내역 합산금액 조회
	@Override
	public int selectTotalPoint(String user_code) {
		Integer totalPoint = pointMapper.selectTotalPoint(user_code);
        return totalPoint != null ? totalPoint : 0;
	}

}
