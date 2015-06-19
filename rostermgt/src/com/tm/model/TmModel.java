package com.tm.model;

public class TmModel {

	public static String TMUpdateInfo(String tmName, String tmEmail,
			String tmId, String resignedDate, String hiredDate) {

		return "UPDATE hdpr.tbl_roster_tm_mapping SET tm_email='" + tmEmail
				+ "', tm_name='" + tmName + "' WHERE tm_employee_id='" + tmId
				+ "'" + ",resigned_date="
				+ (resignedDate.equals("") ? null + "," : "'" + resignedDate)
				+ "'," + "hired_date="
				+ (hiredDate.equals("") ? null : "'" + hiredDate) + "'";
	}

	public static String addTMWorkgroups(String wgName, String startDate,
			String endDate, String tmId)

	{
		StringBuilder addWG = new StringBuilder();
		addWG.append("INSERT INTO hdpr.tbl_roster_tm_wg_mapping");
		addWG.append("(\"wg_name\",\"is_active\",\"tm_id\",\"start_date\",\"end_date\")VALUES");
		addWG.append("('" + wgName + "','1',");
		addWG.append("'" + tmId + "',");
		addWG.append(((startDate.equals("")) ? null + "," : "'" + startDate
				+ "',"));
		addWG.append(((endDate.equals("")) ? null + ")" : "'" + endDate + "')"));

		return addWG.toString();
	}

	public static String DeletetmWG(String tmId)

	{
		StringBuilder addWG = new StringBuilder();
		addWG.append("DELETE FROM hdpr.tbl_roster_tm_wg_mapping WHERE tm_id='"
				+ tmId + "' AND is_active='1'");

		return addWG.toString();
	}

	public static String GetTMInfo(String tm_id)

	{
		StringBuilder addWG = new StringBuilder();
		addWG.append("SELECT * FROM hdpr.tbl_roster_tm_mapping WHERE tm_employee_id ='"
				+ tm_id + "'");

		return addWG.toString();
	}

	public static String GetTMList(String tmId, String role)

	{
		StringBuilder getTmList = new StringBuilder();
		if (role.equals("21232f297a57a5a743894a0e4a801fc3") || role.equals(null) || role.equals("null")) {

			getTmList
					.append("SELECT * FROM hdpr.tbl_roster_tm_mapping  WHERE resigned_date IS null ORDER BY tm_name ASC");
		} else {

			getTmList
					.append("SELECT * FROM hdpr.tbl_roster_tm_mapping WHERE tm_employee_id='"
							+ tmId
							+ "' AND resigned_date IS null ORDER BY tm_name ASC");
		}
		return getTmList.toString();
	}

	public static String AddTmInfo(String tmId, String tmName, String tmEmail,
			String hiredDate)

	{
		StringBuilder getTmList = new StringBuilder();
		getTmList
				.append("INSERT INTO hdpr.tbl_roster_tm_mapping(\"tm_employee_id\",\"tm_is_active\",\"tm_name\",\"tm_email\",\"hired_date\")VALUES");
		getTmList.append("('" + tmId + "','1','" + tmName + "','" + tmEmail + "',");
		getTmList.append((hiredDate.equals("") ? null : "'" +  hiredDate + "'"));
		getTmList.append(")");
		return getTmList.toString();
	}

	public static String DeleteTM(String tmId)

	{
		StringBuilder sb = new StringBuilder();
		sb.append("DELETE FROM hdpr.tbl_roster_tm_mapping WHERE tm_employee_id ='"
				+ tmId + "'; ");

		sb.append("DELETE FROM hdpr.tbl_roster_emp_tm_mapping WHERE tm_id ='"
				+ tmId + "'; ");

		sb.append(" DELETE FROM hdpr.tbl_roster_tm_wg_mapping WHERE tm_id ='"
				+ tmId + "'; ");
		return sb.toString();
	}
	
	public static String GetPSMEmail(String tmId)

	{
		StringBuilder sb = new StringBuilder();
		sb.append("SELECT psm_email FROM hdpr.tbl_roster_tm_psm_mapping WHERE tm_id ='"
				+ tmId + "'; ");

		return sb.toString();
	}
	
	public static String GetInterimTMList(){
		
		StringBuilder sb = new StringBuilder();
		
		sb.append(" SELECT * FROM hdpr.tbl_roster_employees a INNER JOIN hdpr.tbl_roster_interim_tm_list  b ");
		sb.append(" ON a.emp_id = b.emp_id WHERE b.is_current='1' AND end_date is null"); 
		
		return sb.toString();
	}

}
