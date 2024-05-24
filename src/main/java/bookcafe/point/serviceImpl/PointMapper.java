package bookcafe.point.serviceImpl;

import java.util.List;

import bookcafe.point.service.PointVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface PointMapper {

	// 포인트 전체 조회하기(한사람)
	public List<PointVO> getPointList(String user_id);
	
	// 포인트 내역 기록
	public int insertPointLog(PointVO pointVO);
	
}
