package com.admin.model;

/**
 * @author marangelo
 * 
 */
public class AdminModel {
	public static String GetTenurePerProdFam()

	{
		StringBuilder sb = new StringBuilder();
		sb.append("select upper(c.product_family_name) as \"product_family_name\", ");
		sb.append(" coalesce(a.acountmonth,'0') as \"acountmonth\", ");  
		sb.append(" coalesce(b.bcountmonth,'0') as \"bcountmonth\", ");
		sb.append(" coalesce(d.dcountmonth,'0') as \"dcountmonth\", ");
		sb.append(" coalesce(e.ecountmonth,'0') as \"ecountmonth\" from ");

		sb.append(" hdpr.tbl_roster_prod_family c ");
		sb.append(" LEFT OUTER JOIN  ");
		sb.append(" (SELECT COUNT(*) as acountmonth ,emp_product_family from hdpr.tbl_roster_employees ");
		sb.append(" WHERE ");
		sb.append(" (CAST(DATE_PART('day', current_date::timestamp - to_date(emp_hired_date,'yyyy-mm-dd')::timestamp) AS INT)/30) <= 6 ");
		sb.append(" AND emp_hired_date <> '' ");
		sb.append(" GROUP BY emp_product_family ORDER BY emp_product_family) a ");
		sb.append(" ON ");
		sb.append(" a.emp_product_family = c.product_family_name ");

		sb.append(" LEFT OUTER JOIN  ");
		sb.append(" (SELECT COUNT(*) as bcountmonth ,emp_product_family from hdpr.tbl_roster_employees ");
		sb.append(" WHERE ");
		sb.append(" (CAST(DATE_PART('day', current_date::timestamp - to_date(emp_hired_date,'yyyy-mm-dd')::timestamp) AS INT)/30) > 6 AND ");
		sb.append(" (CAST(DATE_PART('day', current_date::timestamp - to_date(emp_hired_date,'yyyy-mm-dd')::timestamp) AS INT)/30) <= 12 ");
		sb.append(" AND emp_hired_date <> '' ");
		sb.append(" GROUP BY emp_product_family ORDER BY emp_product_family) b ");
		sb.append(" ON ");
		sb.append(" b.emp_product_family = c.product_family_name ");

		sb.append(" LEFT OUTER JOIN  ");
		sb.append(" (SELECT COUNT(*) as dcountmonth ,emp_product_family from hdpr.tbl_roster_employees ");
		sb.append(" WHERE ");
		sb.append(" (CAST(DATE_PART('day', current_date::timestamp - to_date(emp_hired_date,'yyyy-mm-dd')::timestamp) AS INT)/30) > 12 AND");
		sb.append(" (CAST(DATE_PART('day', current_date::timestamp - to_date(emp_hired_date,'yyyy-mm-dd')::timestamp) AS INT)/30) <= 24 ");
		sb.append(" AND emp_hired_date <> '' ");
		sb.append(" GROUP BY emp_product_family ORDER BY emp_product_family) d ");
		sb.append(" ON ");
		sb.append(" d.emp_product_family = c.product_family_name ");

		sb.append(" LEFT OUTER JOIN  ");
		sb.append(" (SELECT COUNT(*) as ecountmonth ,emp_product_family from hdpr.tbl_roster_employees ");
		sb.append(" WHERE ");
		sb.append(" (CAST(DATE_PART('day', current_date::timestamp - to_date(emp_hired_date,'yyyy-mm-dd')::timestamp) AS INT)/30) > 24 ");
		sb.append(" AND emp_hired_date <> '' ");
		sb.append(" GROUP BY emp_product_family ORDER BY emp_product_family) e ");
		sb.append(" ON ");
		sb.append(" e.emp_product_family = c.product_family_name ");

		sb.append(" ORDER BY c.product_family_name ");

		return sb.toString();
	}

	public static String GetAveTenurePerProdFam() {

		StringBuilder sb = new StringBuilder();

		sb.append(" select upper(b.product_family_name) as \"product_family_name\", ");
		sb.append(" COUNT(a.*) as \"empCount\",SUM(a.monthcount) as \"monthCount\" ");
		sb.append(" from ");
		sb.append(" hdpr.tbl_roster_prod_family b ");
		sb.append(" LEFT OUTER JOIN ");
		sb.append(" (select  ");
		sb.append(" (CAST(DATE_PART('day', current_date::timestamp - to_date(emp_hired_date,'yyyy-mm-dd')::timestamp) AS INT)/30) as \"monthcount\", ");
		sb.append(" a.emp_product_family ");
		sb.append(" from ");
		sb.append(" hdpr.tbl_roster_employees a WHERE ");
		sb.append(" emp_hired_date <> '' AND ");
		sb.append(" emp_hired_date is not null ");

		sb.append(" ORDER BY \"monthcount\" DESC) a ");
		sb.append(" ON a.emp_product_family = b.product_family_name ");
		sb.append(" GROUP BY b.product_family_name ORDER BY product_family_name");

		return sb.toString();
	}

	public static String GetHeadsPipeLinePerWorkgroups() {
		StringBuilder sb = new StringBuilder();
		sb.append(" select Coalesce(d.current_head_count,0) as \"current_head_count\", ");
		sb.append(" Coalesce(a.wg_psm_target_head_count,'0')as \"wg_psm_target_head_count\" ,coalesce(a.wg_wf_head_count,'0') as  ");
		sb.append(" \"wg_wf_head_count\", w.recruitment, e.* from ");
		sb.append(" (select * from hdpr.tbl_roster_workgroup_mapping) a LEFT OUTER JOIN  ");
		sb.append(" (SELECT COUNT(*) as \"current_head_count\",b.wg_names ");
		sb.append(" from hdpr.tbl_roster_emp_wg_mapping b INNER  JOIN hdpr.tbl_roster_employees c  ");
		sb.append(" ON b.emp_id = c.emp_id WHERE end_date IS NULL AND emp_name != 'RECRUITMENT' AND emp_status NOT IN('Leave','Contractual','Recruitment')");
		
		sb.append(" GROUP BY wg_names ORDER BY wg_names ASC) d  ON a.wg_name = d.wg_names  ");
		sb.append(" LEFT OUTER JOIN (select f.wg_name,count(g.*) as \"training\"  ");
		sb.append(" from hdpr.tbl_roster_workgroup_mapping f LEFT OUTER JOIN ");
		sb.append(" hdpr.tbl_roster_emp_wg_mapping h ON h.wg_names = f.wg_name LEFT OUTER JOIN ");
		sb.append(" hdpr.tbl_roster_employees g ON g.emp_id = h.emp_id AND emp_is_training = '1' AND h.is_current ='1'");
		sb.append(" group by f.wg_name ORDER BY f.wg_name) e ON e.wg_name = a.wg_name ");
		sb.append(" LEFT OUTER JOIN (select i.wg_name,count(k.*) as \"recruitment\" "); 
		sb.append(" from hdpr.tbl_roster_workgroup_mapping i LEFT OUTER JOIN  ");
		sb.append(" hdpr.tbl_roster_emp_wg_mapping j ON j.wg_names = i.wg_name LEFT OUTER JOIN ");
		sb.append(" hdpr.tbl_roster_employees k  ");
		sb.append(" ON j.emp_id = k.emp_id AND emp_status='Recruitment' AND j.is_current ='1' ");
		sb.append(" group by i.wg_name ORDER BY i.wg_name) w ON w.wg_name = a.wg_name WHERE a.wg_name NOT LIKE '%_TL%'");  
		
		return sb.toString();
	}
	public static String GetUserAccess(String userId){
		
		StringBuilder sb = new StringBuilder();
		sb.append(" SELECT role,emp_name FROM hdpr.tbl_roster_employees WHERE emp_id='" + userId + "' LIMIT 1");
		return sb.toString();
	}
}
