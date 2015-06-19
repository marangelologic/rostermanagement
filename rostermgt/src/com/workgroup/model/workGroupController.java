package com.workgroup.model;

public class workGroupController {
	public static String GetWorkGroupInfo() {

		return "";
	}

	public static String UpdateWorkGroupInfo(int wgId, String wgName,
			String wgpsm, String wgTargetHeadCount, String wgLangCenter,
			String prodFamily, String wgIsActive, String wgWfRecHeadCount) {

		return "";
	}

	public static String AddWorkGroupInfo(String wgName, String wgpsm,
			String wgTargetHeadCount, String wgLangCenter, String prodFamily,
			String wgwf) {
		StringBuilder sb = new StringBuilder();

		sb.append("INSERT INTO hdpr.tbl_roster_workgroup_mapping(\"wg_name\",");
		sb.append("\"wg_psm_lead\",");
		sb.append("\"wg_psm_target_head_count\",");
		sb.append("\"wg_prod_family\",");
		sb.append("\"wg_language_center\",\"wg_wf_head_count\",\"wg_is_active\")VALUES");
		sb.append("('" + wgName + "',");
		sb.append("'" + wgpsm + "',");
		sb.append("'" + wgTargetHeadCount + "',");
		sb.append("'" + prodFamily + "',");
		sb.append("'" + wgLangCenter + "','" + wgwf + "','1')");

		return sb.toString();
	}

	public static String GetTmList() {

		StringBuilder getTmList = new StringBuilder();
		getTmList
				.append("SELECT * FROM hdpr.tbl_roster_tm_mapping ORDER BY tm_name ASC ");

		return getTmList.toString();
	}

	public static String GetPSMInfo(String psmId) {

		return "";
	}

	public static String GetPSMList() {

		return " Select * from hdpr.tbl_roster_psm_mapping ORDER BY psm_name";
	}

	public static String UpdatePSMinfo(String psmName, String psmId) {

		return "";
	}

	public static String AddPSMinfo(String psmName) {

		return "";
	}

	public static String DeletePsm(String psmId) {

		return "";
	}

	public static String DeleteWg(String wgId, String wgName) {

		StringBuilder sb = new StringBuilder();
		sb.append(" DELETE FROM hdpr.tbl_roster_workgroup_mapping WHERE wg_serial_id ='"
				+ wgId + "'; ");

		sb.append(" DELETE FROM hdpr.tbl_roster_emp_wg_mapping where wg_names = '"
				+ wgName + "'; ");

		sb.append(" DELETE FROM hdpr.tbl_roster_tm_wg_mapping WHERE wg_name ='"
				+ wgName + "'; ");

		return sb.toString();
	}

	public static String DeAssociateTMWG(String wgName) {
		StringBuilder sb = new StringBuilder();
		sb.append(" DELETE FROM hdpr.tbl_roster_tm_wg_mapping WHERE wg_name ='"
				+ wgName + "' AND is_active='1'; ");

		return sb.toString();
	}

	public static String GetHistoricalWgTM(String wgName) {

		StringBuilder sb = new StringBuilder();

		sb.append(" SELECT *,b.tm_name FROM hdpr.tbl_roster_tm_wg_mapping a INNER JOIN hdpr.tbl_roster_tm_mapping b ON a.tm_id = b.tm_employee_id WHERE wg_name='"
				+ wgName + "' AND is_active='0'");

		return sb.toString();
	}

	public static String AddToResignedList(String emp_id, String resDate,
			String name, String reason) {

		StringBuilder sb = new StringBuilder();

		sb.append(" INSERT INTO hdpr.tbl_roster_resigned_mapping(\"resigned_emp_id\",\"resigned_date\",\"reason\",\"resigned_emp_name\",\"is_replaced\") VALUES ");
		sb.append("('" + emp_id + "',");
		sb.append("'" + resDate + "',");
		sb.append("'" + reason + "',");
		sb.append("'" + name + "','0')");

		return sb.toString();
	}

	public static String GetWgManagers(String wgNames) {

		StringBuilder sb = new StringBuilder();
		sb.append(" SELECT * FROM hdpr.tbl_roster_tm_wg_mapping WHERE wg_name ='"
				+ wgNames + "'");
		return sb.toString();
	}

	public static String GetLanguageCenterInfo(String psmId) {

		return "";
	}

	public static String GetLanguageCenterList() {

		return "Select * from hdpr.tbl_roster_lang_center ORDER BY lang_center_name ASC";
	}

	public static String UpdateLanguageCenter(String psmName, String psmId) {

		return "";
	}

	public static String AddLanguageCenter(String psmName) {

		return "";
	}

	public static String DeleteLanguageCenter(String psmId) {

		return "";
	}

	public static String GetProdFamInfo(String psmId) {

		return "";
	}

	public static String GetProdFamList() {

		return "Select * from hdpr.tbl_roster_prod_family ORDER BY product_family_name ASC";
	}

	public static String UpdateProdFam(String psmName, String psmId) {

		return "";
	}

	public static String AddProdFam(String psmName) {

		return "";
	}

	public static String DeleteProdFam(String psmId) {

		return "";
	}

	public static String AddWgTmInfo(String tmId, String wgName,
			String wgTmStartDate) {

		StringBuilder sb = new StringBuilder();
		sb.append(" INSERT INTO hdpr.tbl_roster_tm_wg_mapping(\"wg_name\",\"tm_id\",\"is_active\",\"start_date\") VALUES ('"
				+ wgName + "','" + tmId + "','1','" + wgTmStartDate + "')");

		return sb.toString();
	}

	public static String AddUpdateWgTmInfo(String tmId, String wgName,
			String wgTmStartDate, String wgTmEndDate, String isActive) {

		StringBuilder sb = new StringBuilder();

		sb.append(" INSERT INTO hdpr.tbl_roster_tm_wg_mapping(\"wg_name\",\"tm_id\",\"is_active\",\"start_date\",\"end_date\") VALUES ('"
				+ wgName
				+ "','"
				+ tmId
				+ "','"
				+ isActive
				+ "','"
				+ wgTmStartDate
				+ "',"
				+ ((wgTmEndDate.equals("")) ? null + ")" : "'" + wgTmEndDate
						+ "'" + ")"));

		return sb.toString();
	}

	public static String AddUpdatetmwginfo(String wgName, String tmId,
			String wgTmStartDate, String wgTmEndDate, String isActive) {

		StringBuilder sb = new StringBuilder();

		sb.append(" INSERT INTO hdpr.tbl_roster_tm_wg_mapping(\"wg_name\",\"tm_id\",\"is_active\",\"start_date\",\"end_date\") VALUES ('"
				+ wgName
				+ "','"
				+ tmId
				+ "','"
				+ isActive
				+ "','"
				+ wgTmStartDate
				+ "',"
				+ ((wgTmEndDate.equals("")) ? null + ")" : "'" + wgTmEndDate
						+ "'" + ")"));

		return sb.toString();
	}

	public static String UpdateWgTmInfo(String tmId, String wgName,
			String wgTmStartDate, String wgTmEndDate) {

		StringBuilder sb = new StringBuilder();
		sb.append(" INSERT INTO hdpr.tbl_roster_tm_wg_mapping(\"wg_name\",\"tm_id\",\"is_active\",\"start_date\",\"end_date\") VALUES ('"
				+ wgName
				+ "','"
				+ tmId
				+ "','1','"
				+ wgTmStartDate
				+ "','"
				+ ((wgTmEndDate.equals("")) ? null + ")" : "'" + wgTmEndDate
						+ "'" + ")"));

		return sb.toString();
	}

	public static String GetAllworkgroupByTM(String tm_id) {
		return "SELECT a.* from hdpr.tbl_roster_tm_wg_mapping a where a.is_active='1' AND a.tm_id='"
				+ tm_id + "' ORDER BY start_date DESC";
	}

	public static String GetLocationInfo(String locationId) {

		return "";
	}

	public static String GetLocationList() {

		return "Select * from hdpr.tbl_roster_location_mapping ORDER BY location_name ASC ";
	}

	public static String UpdateLocation(String locationName, String locationId) {

		return "";
	}

	public static String AddLocation(String locationName) {

		return "";
	}

	public static String DeleteLocation(String locationId) {

		return "";
	}

}
