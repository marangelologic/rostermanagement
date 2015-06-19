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
 * Servlet implementation class DlAllEval
 */
@WebServlet("/DlAllEval")
public class DlAllEval extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DlAllEval() {
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
		String quarter = request.getParameter("q");
		try {
			conn = DriverManager.getConnection(
					"jdbc:postgresql://10.91.22.235:5432/reporting",
					"postgres", "P0stgres");

			Statement st = conn.createStatement();

			StringBuilder sb = new StringBuilder();

			sb.append("select DISTINCT(a.emp_id),emp_name,a.tm_id,tm_name,tm_work_group_name,COALESCE(tm_prev_score,'10') as \"tm_prev_score\"");
			sb.append(" ,COALESCE(tm_current_score,'10')  as \"tm_current_scores\" ");
			sb.append(" ,coalesce(CAST(\"req_year\" AS INT),extract(year from current_date)) as \"req_year\",COALESCE(CAST(\"quarter\" AS DECIMAL) ,extract(quarter from current_date)) as \"quarter\" FROM ");
			sb.append(" (select emp_name,tm_name,i_emp_tm.tm_id,i_wg.wg_names,i_emp_tm.emp_id FROM hdpr.tbl_roster_emp_tm_mapping i_emp_tm  ");

			sb.append("INNER JOIN hdpr.tbl_roster_tm_mapping i_tm ON i_tm.tm_employee_id = i_emp_tm.tm_id AND i_emp_tm.is_current_tm='1' ");
			sb.append("INNER JOIN hdpr.tbl_roster_employees i_emp ON i_emp.emp_id = i_emp_tm.emp_id ");

			sb.append("WHERE is_current_tm='1' )");
			sb.append(" a LEFT OUTER JOIN  (select \"req_year\", \"quarter\", emp_id,tm_id,tm_prev_score,tm_current_score,tm_work_group_name FROM hdpr.tbl_roster_qa_requests WHERE decision_type='approved' and is_current_record = '1'");
			sb.append(" AND \"quarter\"='" + quarter
					+ "' ) b ON (a.emp_id = b.emp_id) ORDER BY tm_name");

			ResultSet allemp = st.executeQuery(sb.toString());
			/* VDI = cs.executeQuery(); */

			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition",
					"attachment; filename=All Employees Evaluation.xls");   
			WritableWorkbook w = Workbook.createWorkbook(response
					.getOutputStream());
			WritableSheet s = w.createSheet("All Evaluation Data", 0);
			WritableCellFormat cellFormat = new jxl.write.WritableCellFormat(
					new jxl.write.DateFormat("MM/dd/yyyy hh:mm"));

			int counter = 1;
			s.addCell(new Label(0, 0, "Employee ID"));
			s.addCell(new Label(1, 0, "Employee Name"));
			s.addCell(new Label(2, 0, "TM Employee ID"));
			s.addCell(new Label(3, 0, "Team Manager Name"));
			s.addCell(new Label(4, 0, "Current Target"));
			s.addCell(new Label(5, 0, "Quarter"));
			s.addCell(new Label(6, 0, "Year"));
			s.addCell(new Label(7, 0, "Work Group"));

			while (allemp.next()) {
				s.addCell(new Label(0, counter, allemp.getString("emp_id")));
				s.addCell(new Label(1, counter, allemp.getString("emp_name")));
				s.addCell(new Label(2, counter, allemp.getString("tm_id")));
				s.addCell(new Label(3, counter, allemp.getString("tm_name")));
				
				s.addCell(new Label(4, counter, allemp
						.getString("tm_current_scores")));
				s.addCell(new Label(5, counter, allemp.getString("quarter")));

				s.addCell(new Label(6, counter, allemp.getString("req_year")));
				s.addCell(new Label(7, counter, allemp.getString("tm_work_group_name")));
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
			} catch (SQLException ex) {
				Logger.getLogger(DlAllEmployee.class.getName()).log(
						Level.SEVERE, null, ex);
			}
		}
	}

}
