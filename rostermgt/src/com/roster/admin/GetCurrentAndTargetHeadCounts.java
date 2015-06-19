package com.roster.admin;

import java.io.IOException;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;

/**
 * Servlet implementation class GetCurrentAndTargetHeadCounts
 */
@WebServlet("/gcpsmh")
public class GetCurrentAndTargetHeadCounts extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public GetCurrentAndTargetHeadCounts() {
		super();
		// TODO Auto-generated constructor stub
	}


	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		StringBuilder sql = new StringBuilder();
		java.sql.Connection conn = null;
		javax.sql.DataSource ds = null;
		try {

			//javax.naming.InitialContext ctx = null;

			try {
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
				//ctx = new javax.naming.InitialContext();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}   

			//ds = (javax.sql.DataSource) ctx.lookup("mylocalconnection2");
			//conn = ds.getConnection();
			
			sql.append("SELECT COALESCE(c.wg_prod_family,'others',null) as \"wg_prod_family\", COUNT(a.*) as \"current_head_count\",");
			sql.append(" (select SUM(wg_psm_target_head_count) from hdpr.tbl_roster_workgroup_mapping d WHERE d.wg_prod_family = c.wg_prod_family GROUP BY wg_prod_family) as \"target_head_counts\", ");
			sql.append(" (select SUM(CAST(wg_wf_head_count AS INT)) from hdpr.tbl_roster_workgroup_mapping d WHERE d.wg_prod_family = c.wg_prod_family GROUP BY wg_prod_family) as \"wf_head_counts\" ");
			sql.append("from hdpr.tbl_roster_emp_wg_mapping a INNER  JOIN hdpr.tbl_roster_employees b ON  ");
			sql.append("a.emp_id = b.emp_id INNER JOIN hdpr.tbl_roster_workgroup_mapping c ON a.wg_names = c.wg_name ");
			sql.append("WHERE a.end_date IS NULL AND \"wg_prod_family\" is not null AND b.emp_status = 'Permanent' ");
			sql.append("GROUP BY c.wg_prod_family ORDER BY current_head_count,c.wg_prod_family ASC ");

			PreparedStatement st = conn.prepareCall(sql.toString());

			ResultSet data;
			data = st.executeQuery();

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(
					ResultSetConverter.convert(data).toString());

			try {
				st.close();
				conn.close();
				//ds.getConnection().commit();
			} catch (SQLException logOrIgnore) {

			}
			try {
				conn.close();

			} catch (SQLException logOrIgnore) {

			}

		} catch (SQLException e) {

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((e).toString() + " badtrip naman oh");
		} catch (JSONException f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((f).toString());
		} catch (NullPointerException g) {

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((g).toString());
		/*} catch (NamingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();*/
		} finally {
			if (conn == null || conn.equals(null)) {
				try {
					conn.close();
					//ds.getConnection().close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
		}
	}

}
