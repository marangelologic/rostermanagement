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
 * Servlet implementation class GetllRequested
 */
@WebServlet("/GetllRequested")
public class GetllRequested extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public GetllRequested() {
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
			sb.append("select \"req_year\", \"quarter\", emp_id,tm_id,tm_prev_score,tm_current_score,tm_name,emp_name,tm_work_group_name FROM hdpr.tbl_roster_qa_requests WHERE decision_type='approved' and is_current_record = '1'");
			sb.append(" AND \"quarter\"='" + quarter+ "' ORDER BY tm_name");

			ResultSet allemp = st.executeQuery(sb.toString());
			/* VDI = cs.executeQuery(); */

			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition",
					"attachment; filename=All Submitted.xls");
			WritableWorkbook w = Workbook.createWorkbook(response
					.getOutputStream());
			WritableSheet s = w.createSheet("All Submitted", 0);
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
						.getString("tm_current_score")));
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
