package bookcafe.point.serviceImpl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.point.service.PointService;
import bookcafe.point.service.PointVO;

@Service
public class PointServiceImpl implements PointService {
	
	@Autowired
	private PointMapper pointMapper;

	// 포인트 전체 조회하기(한사람)
	@Override
	public List<PointVO> getPointList(String user_id) {
		List<PointVO> pointVOList = pointMapper.getPointList(user_id);
		return pointVOList;
	}

	// 포인트 내역 기록
	@Override
	public int insertPointLog(PointVO pointVO) {
		pointVO.setPoint_joindate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
		int insertP_result = pointMapper.insertPointLog(pointVO);
		
		if (insertP_result == 1) {
			
			//포인트 테이블에 기록될때 회원포인트도 업데이트
			String user_code = pointVO.getUser_code();
			int userP_result = pointMapper.updateUserPoint(user_code);
			System.out.println("userP_result" + userP_result);
		}
		return insertP_result;
	}

}
