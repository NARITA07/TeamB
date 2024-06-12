package bookcafe.point.serviceImpl;

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
	public List<PointVO> getPointList(PointVO pointVO) {
	    return pointMapper.getPointList(pointVO);
	}

	// 포인트 내역 기록
	@Override
	public int insertPointLog(PointVO pointVO) {
		return pointMapper.insertPointLog(pointVO);
	}
	
	// 회원 포인트 업데이트
	@Override
	public int updateUserPoint(String user_code) {
		return pointMapper.updateUserPoint(user_code);
	}
	
	// 포인트내역 합산금액 조회
	@Override
	public int selectTotalPoint(String user_code) {
		Integer totalPoint = pointMapper.selectTotalPoint(user_code);
        return totalPoint != null ? totalPoint : 0;
	}

}
