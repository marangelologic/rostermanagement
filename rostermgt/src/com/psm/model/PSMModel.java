package com.psm.model;

public class PSMModel {
	public static String GetPSMList() {

		StringBuilder sb = new StringBuilder();
		sb.append(" SELECT a.* FROM hdpr.tbl_roster_psm_mapping a  "
				+ "  LEFT OUTER JOIN hdpr.tbl_roster_employees b ");
		sb.append(" ON a.psm_employee_number = b.emp_id ");
		sb.append(" ORDER BY psm_name ASC ");

		return sb.toString();
	}

	public static String AddPSM() {

		return "";
	}

	public static String EditPSM() {

		return "";
	}

	public static String DeletePSM() {

		return "";
	}

	public static String GetCenterList() {

		return "";
	}

	public static String AddCenter() {

		return "";
	}

	public static String EditCenter() {

		return "";
	}

	public static String DeleteCenter() {

		return "";
	}

	public static String GetProdFamList() {

		return "";
	}

	public static String AddProdFam() {

		return "";
	}

	public static String EditProdFam() {

		return "";
	}

	public static String DeleteProdFam() {

		return "";
	}

	public static String GetRolesList() {

		return "";
	}

	public static String AddRoles() {

		return "";
	}

	public static String EditRoles() {

		return "";
	}

	public static String DeleteRoles() {

		return "";
	}
}
