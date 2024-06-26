package bookcafe.point.service;

import java.util.List;
import java.util.Map;

public interface PointService {
	
	// 포인트 전체 조회하기(한사람)
	public List<PointVO> getPointList(PointVO pointVO);
	
	// 포인트 내역 기록
	public int insertPointLog(PointVO pointVO);
	
	// 회원 포인트 업데이트
	public int updateUserPoint(String user_code);
	
	// 포인트내역 합산금액 조회
	public int selectTotalPoint(String user_code);
	
	// 주문코드를 통해 포인트 내역 조회
	public List<Map<String,Object>> selectOrderToPointLog(String order_code);
	
}
