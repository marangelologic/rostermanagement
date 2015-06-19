package com.reports.wf;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableCell;
import jxl.write.WritableCellFormat;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

/**
 * Servlet implementation class DlAllWG
 */
@WebServlet("/DlAllWG")
public class DlAllWG extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DlAllWG() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		WritableCell cell = null;
		WritableCellFormat cf = null;
		Connection conn = null;
		WritableWorkbook w = Workbook.createWorkbook(response
				.getOutputStream());

		try {
			conn = DriverManager.getConnection(
					"jdbc:postgresql://10.91.22.235:5432/reporting",
					"postgres", "P0stgres");

			Statement st = conn.createStatement();

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

			ResultSet allwg = st.executeQuery(sb.toString());

			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition",
					"attachment; filename=All WorkGroup.xls");
			
			WritableSheet s = w.createSheet("all Workgroup Data", 0);
			WritableCellFormat cellFormat = new jxl.write.WritableCellFormat(
					new jxl.write.DateFormat("MM/dd/yyyy hh:mm"));

			int counter = 1;
			s.addCell(new Label(0, 0, "Work Group Name"));
			s.addCell(new Label(1, 0, "Current Head Count"));
			s.addCell(new Label(2, 0, "Target Head Count"));
			s.addCell(new Label(3, 0, "Work Force Target Head Count"));
			s.addCell(new Label(4, 0, "Recruitment"));
			s.addCell(new Label(5, 0, "Training"));

			while (allwg.next()) {
				s.addCell(new Label(0, counter, allwg.getString("wg_name")));
				s.addCell(new Label(1, counter, allwg
						.getString("current_head_count")));
				s.addCell(new Label(2, counter, allwg
						.getString("wg_psm_target_head_count")));
				s.addCell(new Label(3, counter, allwg
						.getString("wg_wf_head_count")));
				s.addCell(new Label(4, counter, allwg.getString("recruitment")));
				s.addCell(new Label(5, counter, allwg.getString("training")));

				counter++;
			}

			w.write();
			w.close();
		} catch (NullPointerException g) {

		} catch (WriteException ex) {
			Logger.getLogger(DlAllEmployee.class.getName()).log(Level.SEVERE,
					null, ex);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				if (conn != null) {
					conn.close();
				}
				if(w != null){
					w.close();
				}
			} catch (SQLException ex) {
				Logger.getLogger(DlAllEmployee.class.getName()).log(
						Level.SEVERE, null, ex);
			} catch (WriteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

}
