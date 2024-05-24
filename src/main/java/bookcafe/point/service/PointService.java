package bookcafe.point.service;

import java.util.List;

public interface PointService {
	
	// 포인트 전체 조회하기(한사람)
	public List<PointVO> getPointList(String user_id);
	
//	// 포인트 내역 기록
//	public int addPointTable(PointVO pointVO);
//	
//	// 갱신 포인트 조회
//	public int getMemPoint(String user_id);

}
