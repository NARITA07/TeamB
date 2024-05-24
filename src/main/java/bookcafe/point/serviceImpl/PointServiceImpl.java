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
	public List<PointVO> getPointList(String user_id) {
		List<PointVO> pointVOList = pointMapper.getPointList(user_id);
		return pointVOList;
	}

//	// 포인트 내역 기록
//	@Override
//	public int addPointTable(PointVO pointVO) {
//		return 0;
//		int result = pointMapper.addPointTable(pointVO);
//		return result;
//	}
//
//	// 갱신 포인트 조회
//	@Override
//	public int getMemPoint(String user_id) {
//		return 0;
//		int newMemPoint = pointMapper.getMemPoint(user_id);
//		return newMemPoint;
//	}

}
