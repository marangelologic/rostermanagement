package com.workgroup.model;

public class Workgroupdatalayer {

	public static String getAllWorkgroup(String role, String empid) {

		StringBuilder sb = new StringBuilder();
		if (role.equals("") || role.equals(null) || role.equals("null")) {
			sb.append(" SELECT a.* FROM hdpr.tbl_roster_workgroup_mapping a");
			sb.append(" WHERE wg_name NOT LIKE '%_TL' AND wg_name NOT LIKE '%_TL1' AND wg_is_active='1' ORDER BY wg_name ASC ");
		} else {
			sb.append(" SELECT b.* FROM hdpr.tbl_roster_workgroup_mapping a INNER JOIN hdpr.tbl_roster_tm_wg_mapping b ");
			sb.append(" ON a.wg_name = b.wg_name WHERE b.tm_id='" + empid
					+ "' ");
			sb.append(" AND a.wg_name NOT LIKE  '%_TL' AND a.wg_name NOT LIKE '%_TL1' AND b.is_active='1' ORDER BY a.wg_name ASC ");
		}
		return sb.toString();
	}

}
