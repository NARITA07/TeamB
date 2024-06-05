package bookcafe.point.serviceImpl;

import java.util.List;

import bookcafe.point.service.PointVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface PointMapper {

	// 포인트 전체 조회하기(한사람)
	public List<PointVO> getPointList(String user_code);
	
	// 포인트 내역 기록
	public int insertPointLog(PointVO pointVO);
	
	// 회원 포인트 업데이트
	public int updateUserPoint(String user_code);
	
	// 포인트내역 합산금액 조회
	public Integer selectTotalPoint(String user_code);
}
