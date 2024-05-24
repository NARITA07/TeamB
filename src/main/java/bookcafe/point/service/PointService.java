package bookcafe.point.service;

import java.util.List;

public interface PointService {
	
	// 포인트 전체 조회하기(한사람)
	public List<PointVO> getPointList(String user_id);
	
	// 포인트 내역 기록
	public int insertPointLog(PointVO pointVO);
	
}
